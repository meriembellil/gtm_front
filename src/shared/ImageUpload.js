import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { UncontrolledAlert } from 'reactstrap'

export default function ImageUpload(props) {

    const { selectedFile, setselectedFile } = props
    const [invalidType, setInvalidType] = useState(false)

    function handleAcceptedFile(files) {
        setselectedFile(Object.assign(files[0], {
            preview: URL.createObjectURL(files[0]),
            formattedSize: formatBytes(files[0].size),
        }))
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    useEffect(() => {
        if (selectedFile && !selectedFile?.path?.endsWith(".jpg")) {
            setselectedFile(null)
            setInvalidType(true)
        }
        if (selectedFile && selectedFile?.path?.endsWith(".jpg")) {
            setInvalidType(false)
        }
    }, [selectedFile])

    return (
        <Dropzone
            onDrop={acceptedFile => {
                handleAcceptedFile(acceptedFile)
            }}
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
                        <h4>Drop picture to upload here.</h4>
                        {invalidType === true &&
                            <UncontrolledAlert
                                color="danger"
                                className="alert-dismissible fade show"
                                role="alert"
                            >
                                <i className="mdi mdi-block-helper me-2"></i> only JPEG(.jpg) files are accepted
                            </UncontrolledAlert>
                        }
                    </div>
                </div>
            )}
        </Dropzone>
    )
}