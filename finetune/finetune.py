import pyarrow.parquet as pq
import pandas as pd
import sys

# Read the Parquet file
parquet_file = sys.argv[1]  # Pass the Parquet file path as an argument
table = pq.read_table(parquet_file)

# Convert to pandas DataFrame
df = table.to_pandas()

# Convert to JSONL and save
output_file = 'output.jsonl'
df.to_json(output_file, orient='records', lines=True)

print(f"Conversion complete. JSONL file saved as {output_file}")
