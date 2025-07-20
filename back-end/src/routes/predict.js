import axios from 'axios';

export const predict={
    path:"/api/predict",
    method:"post",
    handler:async (req, res) => {
        try {
            const response = await axios.post('http://localhost:3000/predict', req.body);
            res.json(response.data);
        } catch (error) {
            console.error("Prediction API Error:", error);
            res.status(500).send("Failed to fetch prediction");
        }
    }
}