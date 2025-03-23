import os
import csv

# Specify the directory containing the files
directory = './output_tif_new/output_tif'

# Prepare a list to store the mappings
mappings = []

# Iterate over each file in the directory
for filename in os.listdir(directory):
    # Check if 'final_' and '_new_mask' are in the filename
    if 'final_' in filename and '_new_mask' in filename:
        # Remove the initial part up to and including 'final_'
        part_after_final = filename.split('final_', 1)[1]
        # Remove the final part starting from '_somenumber_somenumber_new_mask'
        # Assuming the part to remove is like '_number_number_new_mask'
        new_name = part_after_final.rsplit('_', 4)[0]
        # Append the original and new name to the mappings list
        mappings.append([filename, new_name])

# Sort the mappings alphabetically by the original filename
mappings.sort(key=lambda x: x[0])

# Specify the output CSV file
output_csv = './Sentinel2Utils/file_mappings.csv'

# Write the mappings to the CSV file
with open(output_csv, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Original Filename', 'New Filename'])  # Write the header
    writer.writerows(mappings)  # Write the mappings

print(f'Mappings have been saved to {output_csv}')
