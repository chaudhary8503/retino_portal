import { useState } from "preact/hooks";

const UploadComponent = () => {
  const [image, setImage] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview Image
    }
  };

  // Handle form submission
  const handleUpload = (event) => {
    event.preventDefault();
    console.log("Image Uploaded!");
    alert("Image uploaded successfully!");
  };

  return (
    <div class="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
        Upload Image
      </h2>

      <form onSubmit={handleUpload} class="space-y-6">
        {/* File Upload Box */}
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-accent transition">
          <label for="file-upload" class="block text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
            Click to upload or drag and drop
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            required
            class="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div class="mt-4 flex justify-center">
            <img src={image} alt="Uploaded Preview" class="w-32 h-32 rounded-lg shadow-md" />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          class="w-full bg-accent text-white font-semibold py-3 rounded-lg shadow-md hover:bg-accent-dark hover:scale-[1.03] transition-transform"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default UploadComponent;
