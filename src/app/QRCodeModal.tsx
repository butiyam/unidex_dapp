'use client';
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

type QRCodeModalProps = {
  show: boolean;
  onClose: () => void;
  ethAddress: string;
};

export default function QRCodeModal({ show, onClose, ethAddress }: QRCodeModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div style={{background :'#192800'}} className="relative w-[250px] bg-black rounded-lg p-4 shadow-lg text-center  border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 style={{marginBottom: "10px"}} className="text-base font-semibold text-white mb-3">Donate ETH</h2>

        {/* QR Code */}
        <QRCodeCanvas style={{display: 'inline-flex'}} value={ethAddress} size={200} bgColor="#000000" fgColor="#ffffff" />

        {/* ETH Address */}
        <p style={{marginTop: "10px"}} className="mt-10 text-xs text-gray-300 break-all">{ethAddress}</p>
      </div>
    </div>
  );
}
