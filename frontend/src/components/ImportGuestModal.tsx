import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileType, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api';
import { useWeddingStore } from '../store/useWeddingStore';

interface ImportGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ImportGuestModal: React.FC<ImportGuestModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ created: number; skipped: number; errors: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await api.get('/guests/upload/template', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'wedding_guest_template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to download template', err);
      setError('Failed to download template.');
    }
  };

  const handleUpload = async () => {
    // 1. Get the FRESH ID from the store (not the stale hook value)
    const currentWeddingId = useWeddingStore.getState().weddingId;
    const currentSideId = useWeddingStore.getState().sideId;

    if (!currentWeddingId || currentWeddingId === 'undefined') {
      setError('Wedding ID not found. Please refresh the dashboard.');
      return;
    }
    
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    console.log(`Starting Upload: WeddingID=${currentWeddingId}, SideID=${currentSideId || 'Auto'}`);
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/guests/upload', formData, {
        params: {
          weddingId: currentWeddingId,
          sideId: currentSideId || undefined,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      if (response.data.created > 0) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetAndClose = () => {
    setFile(null);
    setResult(null);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Import Guests</h2>
                  <p className="text-slate-500 text-sm font-medium">Upload your Excel or CSV guest list</p>
                </div>
                <button 
                  onClick={resetAndClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {!result ? (
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div 
                    className={`relative border-2 border-dashed rounded-3xl p-10 transition-all flex flex-col items-center justify-center gap-4 ${
                      file ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 dark:border-slate-800 hover:border-pink-500/50'
                    }`}
                  >
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".xlsx, .xls, .csv"
                      disabled={isUploading}
                    />
                    <div className={`p-4 rounded-2xl ${file ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {file ? <FileType size={32} /> : <Upload size={32} />}
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {file ? file.name : 'Click or Drag to Upload'}
                      </p>
                      <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">
                        XLSX, XLS or CSV (Max 5MB)
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleUpload}
                      disabled={!file || isUploading}
                      className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                        !file || isUploading 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 active:scale-95'
                      }`}
                    >
                      {isUploading ? <Loader2 className="animate-spin" size={20} /> : null}
                      {isUploading ? 'Processing...' : 'Start Import'}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="text-center text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Download spreadsheet template
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Import Successful!</h3>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <p className="text-xl font-black text-emerald-600">{result.created}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Imported</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <p className="text-xl font-black text-amber-600">{result.skipped}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skipped</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <p className="text-xl font-black text-rose-600">{result.errors}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Failures</p>
                    </div>
                  </div>
                  <button 
                    onClick={resetAndClose}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImportGuestModal;
