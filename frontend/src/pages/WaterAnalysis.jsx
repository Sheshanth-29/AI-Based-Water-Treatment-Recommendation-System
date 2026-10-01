import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ScanLine } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import './WaterAnalysis.css';

const WaterAnalysis = () => {

  const navigate = useNavigate();

  const [isScanning, setIsScanning] = useState(false);

  const [formData, setFormData] = useState({
    pH: '',
    turbidity: '',
    hardness: '',
    tds: '',
    microbialRisk: 'Low',
    purpose: 'Drinking Water'
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleAnalyze = async (e) => {

    e.preventDefault();

    setIsScanning(true);


    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/predict`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            pH: Number(formData.pH),

            turbidity: Number(formData.turbidity),

            hardness: Number(formData.hardness),

            tds: Number(formData.tds),

            microbialRisk: formData.microbialRisk
            ,
            purpose: formData.purpose

          })
        }
      );


      if (!response.ok) {

        throw new Error(
          "Backend prediction failed"
        );

      }


      const result = await response.json();


      setIsScanning(false);


      navigate('/results',
        {
          state:
          {
            data: formData,

            apiResult: result
          }
        }
      );


    }


    catch (error) {

      console.error(
        "Backend connection error:",
        error
      );


      setIsScanning(false);


      alert(
        "Could not reach the AI backend. It may be waking up, so please wait a few seconds and try again."
      );

    }

  };



  return (

    <div className="water-analysis page-transition">

      <header className="page-header">

        <h1 className="page-title">
          Water Analysis
        </h1>

        <p className="page-subtitle">
          Enter water parameters to get an AI-powered treatment recommendation.
        </p>

      </header>



      <div className="analysis-content">


        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}
        >


          <GlassCard className="analysis-card">


            {
              isScanning ?

                (

                  <div className="scanning-container">


                    <div className="scanner">

                      <div className="scanner-line"></div>

                      <ScanLine
                        size={64}
                        className="scanner-icon"
                      />

                    </div>


                    <h3>
                      AI is analyzing your water sample...
                    </h3>


                    <p>
                      Evaluating parameters through the Random Forest model.
                    </p>


                  </div>

                )


                :

                (

                  <form
                    onSubmit={handleAnalyze}
                    className="analysis-form"
                  >


                    <div className="form-grid">


                      <div className="input-group">

                        <label>
                          pH Level
                        </label>


                        <input

                          type="number"

                          step="0.1"

                          name="pH"

                          placeholder="e.g. 7.2"

                          required

                          value={formData.pH}

                          onChange={handleChange}

                        />

                      </div>




                      <div className="input-group">

                        <label>
                          Turbidity (NTU)
                        </label>


                        <input

                          type="number"

                          step="0.1"

                          name="turbidity"

                          placeholder="e.g. 3.5"

                          required

                          value={formData.turbidity}

                          onChange={handleChange}

                        />

                      </div>




                      <div className="input-group">

                        <label>
                          Hardness (mg/L)
                        </label>


                        <input

                          type="number"

                          name="hardness"

                          placeholder="e.g. 120"

                          required

                          value={formData.hardness}

                          onChange={handleChange}

                        />

                      </div>




                      <div className="input-group">

                        <label>
                          TDS (ppm)
                        </label>


                        <input

                          type="number"

                          name="tds"

                          placeholder="e.g. 300"

                          required

                          value={formData.tds}

                          onChange={handleChange}

                        />

                      </div>




                      <div className="input-group full-width">

                        <label>
                          Microbial Risk
                        </label>


                        <select

                          name="microbialRisk"

                          value={formData.microbialRisk}

                          onChange={handleChange}

                        >

                          <option value="Low">
                            Low
                          </option>


                          <option value="Medium">
                            Medium
                          </option>


                          <option value="High">
                            High
                          </option>


                        </select>


                      </div>


                      <div className="input-group full-width">

                        <label>
                          Purpose
                        </label>

                        <select

                          name="purpose"

                          value={formData.purpose}

                          onChange={handleChange}

                        >

                          <option value="Drinking Water">Drinking Water</option>

                          <option value="Irrigation">Irrigation</option>

                          <option value="Industrial Use">Industrial Use</option>

                          <option value="Domestic Use">Domestic Use</option>

                        </select>


                      </div>


                    </div>




                    <div className="form-actions">


                      <AnimatedButton
                        type="submit"
                        className="analyze-btn"
                      >

                        <Activity size={20} />

                        Analyze Water

                      </AnimatedButton>


                    </div>



                  </form>

                )

            }


          </GlassCard>


        </motion.div>


      </div>


    </div>

  );

};


export default WaterAnalysis;