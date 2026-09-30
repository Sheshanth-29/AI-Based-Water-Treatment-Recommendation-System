import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from model import (
    predict_water_treatment,
    train_model,
    MODEL_FILE,
    get_dataset_path
)


app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)


@app.route('/', methods=['GET'])
@app.route('/health', methods=['GET'])
def health_check():
    """
    Backend Health Check & Status Endpoint
    """

    return jsonify({
        "status": "online",
        "service": "Intelligent Water Treatment Recommendation System API",
        "model_trained": os.path.exists(MODEL_FILE),
        "dataset_present": os.path.exists(get_dataset_path())
    }), 200



@app.route('/predict', methods=['POST'])
def predict():
    """
    POST /predict

    Input example:
    {
        "pH": 7.2,
        "turbidity": 3.5,
        "hardness": 120,
        "tds": 300,
        "microbialRisk": "Low"
    }

    Returns:
    - Water quality prediction
    - Confidence
    - Treatment recommendation
    """

    try:

        data = request.get_json() or {}


        # Accept different naming formats
        ph = (
            data.get('pH')
            if data.get('pH') is not None
            else data.get('ph', 7.0)
        )

        turbidity = (
            data.get('turbidity')
            if data.get('turbidity') is not None
            else data.get('Turbidity', 1.0)
        )

        hardness = (
            data.get('hardness')
            if data.get('hardness') is not None
            else data.get('Hardness', 100)
        )

        tds = (
            data.get('tds')
            if data.get('tds') is not None
            else data.get('TDS', 250)
        )


        microbial_risk = (
            data.get('microbialRisk')
            or data.get('microbial_risk')
            or "Low"
        )


        result = predict_water_treatment(
            ph=ph,
            turbidity=turbidity,
            hardness=hardness,
            tds=tds,
            microbial_risk=microbial_risk
        )

        # Purpose for use (optional)
        purpose = (
            data.get('purpose')
            or data.get('use')
            or data.get('purpose_type')
            or 'Drinking Water'
        )

        purpose_str = str(purpose)
        purpose_key = purpose_str.strip().lower()

        quality_status = result.get('quality_status', 'Needs Attention')
        confidence = result.get('confidence', 0)
        reasoning = result.get('reasoning') or result.get('reason') or ''

        params = result.get('parameters', {})
        ph_v = float(params.get('ph', ph))
        turb_v = float(params.get('turbidity', turbidity))
        hard_v = float(params.get('hardness', hardness))
        tds_v = float(params.get('tds', tds))

        treatment_required = False
        recommended = []
        reason_text = reasoning

        if 'drink' in purpose_key or 'drinking' in purpose_key:
            if quality_status != 'Safe':
                treatment_required = True
                recommended = [
                    'Reverse Osmosis',
                    'UV Disinfection',
                    'Activated Carbon Filtration'
                ]
                reason_text = reason_text or 'Water not classified as safe for drinking.'
            else:
                treatment_required = False
                recommended = ['No major treatment required', 'Optional UV purification']
                reason_text = reason_text or 'Parameters indicate safe drinking water; UV optional.'

        elif 'irrig' in purpose_key:
            suitable = (6.0 <= ph_v <= 8.5) and (tds_v <= 1500) and (hard_v <= 300)
            if suitable:
                treatment_required = False
                recommended = ['Suitable for irrigation', 'No treatment required']
                reason_text = reason_text or 'Parameters fall within common irrigation thresholds.'
            else:
                treatment_required = True
                recommended = ['Filtration', 'pH correction', 'Salinity reduction']
                reason_text = reason_text or 'Parameters exceed recommended limits for irrigation.'

        elif 'indust' in purpose_key or 'industrial' in purpose_key:
            treatment_required = True
            recommended = ['Softening', 'Reverse Osmosis', 'Demineralization']
            reason_text = reason_text or 'Industrial processes often require low hardness and TDS; advanced treatment recommended.'

        else:
            mrisk = str(microbial_risk).capitalize()
            if turb_v > 1.0 or hard_v > 150 or mrisk != 'Low':
                treatment_required = True
                recommended = ['Sediment Filtration', 'Activated Carbon Filtration', 'UV Disinfection']
                reason_text = reason_text or 'Domestic water requires filtration due to turbidity/hardness/microbial indicators.'
            else:
                treatment_required = False
                recommended = ['Basic Filtration (optional)']
                reason_text = reason_text or 'Domestic water parameters are within acceptable ranges.'

        api_response = {
            'purpose': purpose_str,
            'quality_status': quality_status,
            'confidence': confidence,
            'treatment_required': treatment_required,
            'recommended_treatment': recommended,
            'reason': reason_text,
            'score': result.get('score'),
            'model_trained': result.get('model_trained', False),
            'parameters': result.get('parameters', {})
        }

        return jsonify(api_response), 200



    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400




@app.route('/train', methods=['POST'])
def train():

    """
    Retrain ML model endpoint
    """

    success = train_model()


    if success:

        return jsonify({
            "status": "success",
            "message": "Random Forest model successfully trained and saved!"
        }), 200


    else:

        return jsonify({
            "status": "error",
            "message": "Training failed. Check dataset location."
        }), 400




if __name__ == '__main__':

    port = int(os.environ.get('PORT', 5000))

    print(
        f"[Server] Water Treatment Recommendation Backend API running on http://127.0.0.1:{port}"
    )

    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )