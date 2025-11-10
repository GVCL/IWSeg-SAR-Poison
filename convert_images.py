import os
import rasterio
import numpy as np
import matplotlib.pyplot as plt
import re

# Set your input and output directories
corruption = 30
input_dir = f'./GEE_Masks/GEE_resized/train_gee/train_{corruption}_gee_with_diff_kernels/'
output_dir = f'./sar_images/masks/train_{corruption}/'

os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    if filename.lower().endswith(('.tif', '.tiff')):
        filepath = os.path.join(input_dir, filename)
        print(f"Converting {filename}...")

        try:
            with rasterio.open(filepath) as src:
                image = src.read()  # shape: (bands, height, width)

                if image.shape[0] >= 3:
                    # Use first 3 bands as RGB
                    rgb = np.stack([image[0], image[1], image[2]], axis=-1)
                    rgb = (rgb - rgb.min()) / (rgb.max() - rgb.min() + 1e-5)
                else:
                    # Single-band grayscale
                    rgb = image[0]
                    rgb = (rgb - rgb.min()) / (rgb.max() - rgb.min() + 1e-5)

                # Build output path
                
                # Extract the first number in the filename
                number = re.search(r'\d+', filename).group()

                output_filename = number + ".png"
                print(output_filename)  # "0.png"

                output_path = os.path.join(output_dir, output_filename)

                # Save using matplotlib
                plt.imsave(output_path, rgb, cmap='gray' if image.shape[0] == 1 else None)

                print(f"Saved: {output_filename}")
        except Exception as e:
            print(f"Error converting {filename}: {e}")

print("Done converting all .tif images to .png")
