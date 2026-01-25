
import re

def clean_price(price_str):
    if not price_str or not price_str.strip():
        return 0
    # Remove Rp, comma, spaces
    clean = re.sub(r'[Rp,\s]', '', price_str)
    try:
        return int(float(clean)) # Convert to float then int to handle .00
    except ValueError:
        return 0

def clean_qty(qty_str):
    if not qty_str or not qty_str.strip():
        return 0
    # simple float parse
    try:
        return float(qty_str)
    except ValueError:
        return 0

def clean_str(s):
    if not s:
        return ""
    return s.strip()

with open('data_raw.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Skip header
lines = lines[1:]

php_output = []

for line in lines:
    parts = line.split('\t')
    # Expected columns: NO, NAMA, Kategori, Buy, Sell, Unit, Barcode, Qty, Total
    # Length might vary if tabs are missing at the end
    
    # Pad parts to ensure index access
    parts = [p.strip() for p in parts]
    while len(parts) < 9:
        parts.append("")

    no = parts[0]
    nama = parts[1]
    kategori = parts[2]
    buy_price = clean_price(parts[3])
    sell_price = clean_price(parts[4])
    unit = parts[5]
    barcode = parts[6]
    qty = clean_qty(parts[7])
    
    # Clean barcode
    if not barcode:
        barcode_val = "null"
    else:
        barcode_val = f"'{barcode}'"
    
    # Clean unit
    if not unit:
        unit = "-"

    # Clean Name - escape single quotes
    nama = nama.replace("'", "\\'")
    
    # Format: ['Name', 'Category', Buy, Sell, 'Unit', 'Barcode', Qty],
    
    entry = f"            ['{nama}', '{kategori}', {buy_price}, {sell_price}, '{unit}', {barcode_val}, {qty}],"
    php_output.append(entry)

print("\n".join(php_output))
