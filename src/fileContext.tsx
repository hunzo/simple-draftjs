import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type FileUpload = {
    files: string
    setFiles: Dispatch<SetStateAction<FileUpload[]>>
}

export const filesContext = createContext<FileUpload | undefined>(undefined)

// export const FilesProvider: React.FC = ({ children }) => {
//     const [fileUpload, setFileUpload] = useState<FileUpload[]>([])
//     return (
//         <filesContext.Provider value={ [{fileUpload, setFileUpload}]}>
//             {children}
//         </filesContext.Provider>
//     )
// }

// export const useEditor = () => {
//     const context = useContext(filesContext)
//     if (!context)
//         throw new Error('useEditor must be call inside EditorProvider')
//     return context
// }