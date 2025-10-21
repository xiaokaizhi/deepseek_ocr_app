import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, X } from 'lucide-react'

export default function ImageUpload({ onImageSelect, preview }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.[0]) {
      onImageSelect(acceptedFiles[0])
    }
  }, [onImageSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
    },
    multiple: false
  })

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-200">Upload Image</h3>
        <ImageIcon className="w-5 h-5 text-purple-400" />
      </div>

      {!preview ? (
        <motion.div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive 
              ? 'border-purple-500 bg-purple-500/10' 
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <motion.div
              animate={{ 
                y: isDragActive ? -10 : 0,
                scale: isDragActive ? 1.1 : 1 
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-purple-600 to-cyan-500 p-4 rounded-2xl">
                  <Upload className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            
            <div>
              <p className="text-lg font-medium text-gray-200">
                {isDragActive ? 'Drop it like it\'s hot! 🔥' : 'Drag & drop your image'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                or click to browse • PNG, JPG, WEBP up to 10MB
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full rounded-2xl border border-white/10"
          />
          <motion.button
            onClick={() => onImageSelect(null)}
            className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
          
          {/* Grounding overlay canvas */}
          <canvas 
            id="preview-canvas" 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        </motion.div>
      )}
    </div>
  )
}
