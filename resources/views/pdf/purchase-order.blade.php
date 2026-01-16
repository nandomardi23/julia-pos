<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Order - {{ $po->po_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #333;
        }
        
        .container {
            padding: 20px 25px;
        }
        
        /* Header */
        .header-table {
            width: 100%;
            margin-bottom: 15px;
        }
        
        .header-table td {
            vertical-align: top;
        }
        
        .company-logo {
            width: 70px;
        }
        
        .company-logo img {
            max-width: 60px;
            max-height: 60px;
        }
        
        .company-info {
            padding-left: 10px;
        }
        
        .company-name {
            font-size: 14pt;
            font-weight: bold;
            color: #1a5f2a;
            margin-bottom: 3px;
        }
        
        .company-details {
            font-size: 8pt;
            color: #555;
            line-height: 1.4;
        }
        
        .po-title-section {
            text-align: right;
        }
        
        .po-title {
            font-size: 20pt;
            font-weight: bold;
            color: #1a5f2a;
            margin-bottom: 10px;
        }
        
        .po-meta {
            font-size: 9pt;
        }
        
        .po-meta-row {
            margin-bottom: 3px;
        }
        
        .po-meta-label {
            display: inline-block;
            width: 80px;
            text-align: right;
            font-weight: bold;
        }
        
        .po-meta-value {
            display: inline-block;
            width: 100px;
            text-align: left;
            padding-left: 10px;
        }
        
        /* Info Boxes */
        .info-boxes {
            width: 100%;
            margin-bottom: 15px;
        }
        
        .info-box {
            width: 48%;
            vertical-align: top;
        }
        
        .info-box-header {
            background: #c9a227;
            color: white;
            font-weight: bold;
            padding: 6px 10px;
            font-size: 9pt;
        }
        
        .info-box-content {
            border: 1px solid #ccc;
            border-top: none;
            padding: 8px 10px;
            min-height: 80px;
            font-size: 9pt;
            line-height: 1.5;
        }
        
        .info-box-content .label {
            color: #666;
            font-size: 8pt;
        }
        
        .info-box-content .value {
            font-weight: 600;
            color: #333;
        }
        
        /* Meta Row */
        .meta-row-table {
            width: 100%;
            margin-bottom: 15px;
            border-collapse: collapse;
        }
        
        .meta-row-table th {
            background: #c9a227;
            color: white;
            font-weight: bold;
            padding: 6px 10px;
            font-size: 8pt;
            text-align: center;
            border: 1px solid #b8931f;
        }
        
        .meta-row-table td {
            border: 1px solid #ccc;
            padding: 6px 10px;
            font-size: 9pt;
            text-align: center;
        }
        
        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        .items-table th {
            background: #c9a227;
            color: white;
            font-weight: bold;
            padding: 8px 6px;
            font-size: 8pt;
            text-align: center;
            border: 1px solid #b8931f;
        }
        
        .items-table td {
            border: 1px solid #ccc;
            padding: 6px;
            font-size: 9pt;
            vertical-align: top;
        }
        
        .items-table td.center { text-align: center; }
        .items-table td.right { text-align: right; }
        
        .items-table tbody tr:nth-child(even) {
            background: #fafafa;
        }
        
        .product-name {
            font-weight: 600;
        }
        
        .product-sku {
            font-size: 8pt;
            color: #666;
        }
        
        .batch-info {
            font-size: 7pt;
            color: #888;
            font-style: italic;
        }
        
        /* Empty rows for consistent look */
        .items-table .empty-row td {
            height: 20px;
            border: 1px solid #ccc;
        }
        
        /* Total Section */
        .total-section {
            width: 100%;
            margin-top: 10px;
        }
        
        .total-row {
            text-align: right;
            padding: 4px 0;
        }
        
        .total-label {
            display: inline-block;
            width: 120px;
            text-align: right;
            font-weight: bold;
            padding-right: 10px;
        }
        
        .total-value {
            display: inline-block;
            width: 120px;
            text-align: right;
            border-bottom: 1px solid #ccc;
            padding: 3px 5px;
        }
        
        .grand-total .total-label {
            font-size: 11pt;
        }
        
        .grand-total .total-value {
            font-size: 11pt;
            font-weight: bold;
            color: #1a5f2a;
            border-bottom: 2px solid #1a5f2a;
        }
        
        /* Notes */
        .notes-section {
            margin-top: 20px;
            padding: 10px;
            background: #f9f9f9;
            border-left: 3px solid #c9a227;
        }
        
        .notes-section h4 {
            font-size: 9pt;
            color: #333;
            margin-bottom: 5px;
        }
        
        .notes-section p {
            font-size: 8pt;
            color: #666;
        }
        
        /* Status Badge */
        .status-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 3px;
            font-size: 8pt;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-draft { background: #e0e0e0; color: #555; }
        .status-sent { background: #bbdefb; color: #1565c0; }
        .status-confirmed { background: #c5cae9; color: #3949ab; }
        .status-shipped { background: #fff3e0; color: #ef6c00; }
        .status-partial { background: #ffe0b2; color: #e65100; }
        .status-received { background: #c8e6c9; color: #2e7d32; }
        .status-cancelled { background: #ffcdd2; color: #c62828; }
        
        /* Footer */
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            font-size: 7pt;
            color: #999;
            text-align: center;
        }
    </style>
</head>
<body>
    @php
        $storeName = \App\Models\Setting::get('store_name', 'POS Julia');
        $storeAddress = \App\Models\Setting::get('store_address', '');
        $storePhone = \App\Models\Setting::get('store_phone', '');
        $storeEmail = \App\Models\Setting::get('store_email', '');
        $storeLogo = \App\Models\Setting::get('store_logo', '');
        
        // Check if logo is a valid file path and exists
        $logoPath = null;
        if ($storeLogo && !empty($storeLogo)) {
            $possiblePaths = [
                public_path('storage/' . $storeLogo),
                public_path('storage/settings/' . $storeLogo),
                public_path('storage/logos/' . $storeLogo),
            ];
            foreach ($possiblePaths as $path) {
                if (file_exists($path)) {
                    $logoPath = $path;
                    break;
                }
            }
        }
    @endphp

    <div class="container">
        <!-- Header -->
        <table class="header-table">
            <tr>
                <td style="width: 55%;">
                    <table>
                        <tr>
                            @if($logoPath)
                            <td class="company-logo">
                                <img src="{{ $logoPath }}" alt="Logo">
                            </td>
                            @endif
                            <td class="company-info">
                                <div class="company-name">{{ $storeName }}</div>
                                <div class="company-details">
                                    @if($storeAddress){{ $storeAddress }}<br>@endif
                                    @if($storePhone)Telp: {{ $storePhone }}<br>@endif
                                    @if($storeEmail)Email: {{ $storeEmail }}@endif
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="po-title-section" style="width: 45%;">
                    <div class="po-title">PURCHASE ORDER</div>
                    <div class="po-meta">
                        <div class="po-meta-row">
                            <span class="po-meta-label">TANGGAL</span>
                            <span class="po-meta-value">{{ $po->order_date ? \Carbon\Carbon::parse($po->order_date)->format('d-m-Y') : '-' }}</span>
                        </div>
                        <div class="po-meta-row">
                            <span class="po-meta-label">NO. PO</span>
                            <span class="po-meta-value">{{ $po->po_number }}</span>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Vendor & Ship To Boxes -->
        <table class="info-boxes">
            <tr>
                <td class="info-box">
                    <div class="info-box-header">SUPPLIER / VENDOR</div>
                    <div class="info-box-content">
                        <div class="value">{{ $po->supplier->name ?? '-' }}</div>
                        @if($po->supplier && $po->supplier->company)
                            <div style="color: #666;">{{ $po->supplier->company }}</div>
                        @endif
                        @if($po->supplier && $po->supplier->address)
                            <div style="margin-top: 5px; font-size: 8pt;">{{ $po->supplier->address }}</div>
                        @endif
                        @if($po->supplier && $po->supplier->phone)
                            <div style="font-size: 8pt;">Telp: {{ $po->supplier->phone }}</div>
                        @endif
                    </div>
                </td>
                <td style="width: 4%;"></td>
                <td class="info-box">
                    <div class="info-box-header">TUJUAN PENGIRIMAN</div>
                    <div class="info-box-content">
                        <div class="value">{{ $po->warehouse->name ?? '-' }}</div>
                        @if($po->warehouse && $po->warehouse->address)
                            <div style="margin-top: 5px; font-size: 8pt;">{{ $po->warehouse->address }}</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Meta Row -->
        <table class="meta-row-table">
            <tr>
                <th style="width: 25%;">DIBUAT OLEH</th>
                <th style="width: 25%;">EST. KEDATANGAN</th>
                <th style="width: 25%;">STATUS</th>
                <th style="width: 25%;">NO. FAKTUR</th>
            </tr>
            <tr>
                <td>{{ $po->user->name ?? '-' }}</td>
                <td>{{ $po->expected_date ? \Carbon\Carbon::parse($po->expected_date)->format('d-m-Y') : '-' }}</td>
                <td>
                    <span class="status-badge status-{{ $po->status }}">
                        {{ $statuses[$po->status] ?? $po->status }}
                    </span>
                </td>
                <td>{{ $po->invoice_number ?? '-' }}</td>
            </tr>
        </table>
        
        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 5%;">NO</th>
                    <th style="width: 40%;">DESKRIPSI PRODUK</th>
                    <th style="width: 10%;">QTY</th>
                    <th style="width: 10%;">DITERIMA</th>
                    <th style="width: 17%;">HARGA SATUAN</th>
                    <th style="width: 18%;">TOTAL</th>
                </tr>
            </thead>
            <tbody>
                @foreach($po->items as $index => $item)
                <tr>
                    <td class="center">{{ $index + 1 }}</td>
                    <td>
                        <div class="product-name">{{ $item->product->title ?? '-' }}</div>
                        @if($item->product && $item->product->sku)
                            <div class="product-sku">SKU: {{ $item->product->sku }}</div>
                        @endif
                        @if($item->batch_number)
                            <div class="batch-info">Batch: {{ $item->batch_number }}</div>
                        @endif
                        @if($item->expiry_date)
                            <div class="batch-info">Exp: {{ \Carbon\Carbon::parse($item->expiry_date)->format('d/m/Y') }}</div>
                        @endif
                    </td>
                    <td class="center">{{ number_format($item->quantity_ordered, 0, ',', '.') }}</td>
                    <td class="center">{{ number_format($item->quantity_received, 0, ',', '.') }}</td>
                    <td class="right">Rp {{ number_format($item->unit_price, 0, ',', '.') }}</td>
                    <td class="right">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                </tr>
                @endforeach
                
                {{-- Add empty rows if less than 5 items --}}
                @for($i = count($po->items); $i < 5; $i++)
                <tr class="empty-row">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                @endfor
            </tbody>
        </table>
        
        <!-- Total Section -->
        <div class="total-section">
            <div class="total-row">
                <span class="total-label">SUBTOTAL</span>
                <span class="total-value">Rp {{ number_format($po->total_amount, 0, ',', '.') }}</span>
            </div>
            <div class="total-row grand-total">
                <span class="total-label">TOTAL</span>
                <span class="total-value">Rp {{ number_format($po->total_amount, 0, ',', '.') }}</span>
            </div>
        </div>
        
        <!-- Notes -->
        @if($po->notes)
        <div class="notes-section">
            <h4>Catatan:</h4>
            <p>{{ $po->notes }}</p>
        </div>
        @endif
        
        <!-- Footer -->
        <div class="footer">
            <p>Dokumen ini digenerate otomatis pada {{ now()->format('d F Y H:i:s') }} | {{ $storeName }}</p>
        </div>
    </div>
</body>
</html>
