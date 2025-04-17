import firebase_admin
from firebase_admin import credentials, db
import datetime

# Initialize Firebase Admin SDK
cred = credentials.Certificate('D:/Habib University/Software Engineering/retino_portal/software-rop-firebase-adminsdk-fbsvc-cd3734a346.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://software-rop-default-rtdb.firebaseio.com'
})

# Example: Save prediction results for a user
def save_prediction(user_id, prediction_result):
    ref = db.reference(f'predictions/{user_id}')
    ref.push({
        'result': prediction_result,
        'timestamp': datetime.datetime.now().isoformat()
    })

# Call your model prediction and save results
# result = your_model_predict(data)
# save_prediction(user_id='user123', prediction_result=result)
