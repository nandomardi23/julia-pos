import React, { useEffect } from 'react'
import Barcode from '@/Components/Product/Barcode'
import { Head } from '@inertiajs/react'

export default function PrintBarcode({ product, qty }) {
    useEffect(() => {
        // Automatically open print dialog when page loads
        setTimeout(() => {
            window.print();
        }, 1000);
    }, []);

    return (
        <div className="bg-white min-h-screen p-4">
            <Head title={`Print Barcode - ${product.title}`} />
            
            <style>
                {`
                @media print {
                    @page {
                        margin: 0;
                        size: landscape;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                    .barcode-container {
                        page-break-inside: avoid;
                    }
                }
                .barcode-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                .barcode-item {
                    border: 1px dashed #ccc;
                    padding: 8px 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: white;
                    min-height: 80px;
                    overflow: hidden;
                }
                .barcode-item svg {
                    margin: 4px 0;
                    max-width: 100%;
                    height: auto;
                }
                `}
            </style>

            <div className="no-print mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center text-blue-800">
                <div>
                    <h1 className="font-bold text-lg">Pratinjau Cetak Barcode</h1>
                    <p className="text-sm">Mencetak {qty} label untuk <strong>{product.title}</strong></p>
                </div>
                <button 
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors"
                >
                    Cetak Sekarang
                </button>
            </div>

            <div className="barcode-grid">
                {[...Array(qty)].map((_, i) => (
                    <div key={i} className="barcode-item barcode-container">
                        <span className="text-[10px] font-bold uppercase mb-1 truncate w-full px-1">
                            {product.title}
                        </span>
                        <Barcode 
                            value={product.barcode || product.sku}
                            width={1.5}
                            height={35}
                            fontSize={11}
                            margin={2}
                            marginTop={4}
                            marginBottom={4}
                        />
                        <span className="text-[10px] mt-1 font-semibold">
                            Rp {new Intl.NumberFormat('id-ID').format(product.sell_price)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
