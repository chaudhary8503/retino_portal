from flask import Flask, request, jsonify, send_from_directory
import tensorflow as tf
import numpy as np
from PIL import Image
import os
from flask_cors import CORS
from fpdf import FPDF  
import io

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Setup Directories
REPORTS_DIR = "reports"
os.makedirs(REPORTS_DIR, exist_ok=True)  

# Load Trained Model
MODEL_PATH = "my_model.h5"  
model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Model loaded successfully!")

# ROP Diagnosis Classes
ROP_CLASSES = ["DG0", "DG1", "DG2", "DG3", "DG4", "DG5", "DG6", 
               "DG7", "DG8", "DG9", "DG10", "DG11", "DG12", "DG13"]

# Store predictions temporarily
predictions_store = {}

@app.route("/upload", methods=["POST"])
def upload():
    """Handles image upload, processes it, and predicts ROP class."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    # Load and preprocess the image
    image_data = Image.open(io.BytesIO(file.read())).convert("RGB")
    image_data = image_data.resize((256, 256))  
    img_array = tf.keras.preprocessing.image.img_to_array(image_data)  
    img_array = np.expand_dims(img_array, axis=0)  

    # Make prediction
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)  
    predicted_label = ROP_CLASSES[predicted_class] if predicted_class < len(ROP_CLASSES) else "Unknown"

    print(f"🔍 Predicted ROP Class: {predicted_label}")  

    # Store the prediction
    predictions_store["last_prediction"] = predicted_label

    return jsonify({"prediction": predicted_label})  

@app.route("/api/get-report", methods=["GET"])
def get_report():
    """Generates a PDF report using the last predicted class."""
    report_id = "12345"
    report_path = os.path.join(REPORTS_DIR, f"{report_id}.pdf")
    image_path = "src/assets/images/table.png"  # Make sure this path is correct

    # Retrieve last stored prediction
    predicted_class = predictions_store.get("last_prediction", "Unknown")
    
    print(f"📝 Generating report for: {predicted_class}")

    # Generate PDF report
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Title
    pdf.cell(200, 10, txt="Retinopathy Assessment Report", ln=True, align="C")
    pdf.ln(10)

    # Diagnosis
    pdf.cell(200, 10, txt=f"Predicted Diagnosis: {predicted_class}", ln=True, align="L")
    pdf.ln(10)

    # Add image
    if os.path.exists(image_path):
        try:
            pdf.image(image_path, x=10, y=None, w=pdf.w - 20)  # Adjust size and positioning if needed
            pdf.ln(10)
        except Exception as e:
            print(f"⚠️ Failed to add image: {e}")
            pdf.cell(200, 10, txt="Note: Diagnosis code table image could not be loaded.", ln=True)

    # Save PDF
    pdf.output(report_path)

    return jsonify({"report_url": f"/reports/{report_id}.pdf"})

@app.route("/reports/<path:filename>", methods=["GET"])
def serve_report(filename):
    """Serves the generated PDF report."""
    try:
        return send_from_directory(REPORTS_DIR, filename, as_attachment=True)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch report: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

