import React from 'react'
import Dropzone from 'react-dropzone'

export default function MutipleImagesUpload(props) {

    const { selectedFiles, setselectedFiles } = props

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    return (
        <Dropzone
            style={{ height: "5rem" }}
            onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles) }}
        >
            {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                    <div
                        className="dz-message needsclick mt-2"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                        </div>
                        {selectedFiles?.length ? (
                            <h4>{selectedFiles.length + " file(s) selected"}</h4>
                        ) : (
                            <h4>Drop images here or click to upload.</h4>
                        )}
                    </div>
                </div>
            )}
        </Dropzone>
    )
}