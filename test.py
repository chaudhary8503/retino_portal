import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

# Load the trained model
MODEL_PATH = "my_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Path to test image
image_path = "44.jpg"  # Replace with your test image path

# Load and preprocess the image
img = Image.open(image_path).convert("RGB")  # Ensure it's RGB
img = img.resize((256, 256))  # Resize to match model input size
img_array = tf.keras.preprocessing.image.img_to_array(img)  # Convert to array
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension



# Make a prediction
predictions = model.predict(img_array)

# Print raw model output (probabilities for each class)
print("Raw Predictions:", predictions)

# Interpret results
predicted_class = np.argmax(predictions)  # Get class index
class_labels = ["DG0", "DG1", "DG2", "DG3", "DG4", "DG5", "DG6", "DG7", "DG8", "DG9", 
                "DG10", "DG11", "DG12", "DG13"]  # Adjust based on your model

predicted_label = class_labels[predicted_class] if predicted_class < len(class_labels) else "Unknown"

# Print result
print(f"Predicted Class Index: {predicted_class}")
print(f"Predicted Diagnosis: {predicted_label}")

