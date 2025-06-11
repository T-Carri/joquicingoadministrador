import {  collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase"; // Ajusta esta importación según tu estructura
import type { addingDocGacetaMunicipal, DocGacetaMunicipal } from "../interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addPeriodo = async (
  period: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    if (!period || !/^\d{4}$/.test(period)) {
      return {
        success: false,
        message:
          "El período proporcionado es inválido. Debe ser un año de 4 dígitos.",
      };
    }

    // Referencia al documento con ID "fecha" dentro de la colección específica del periodo
    const docRef = doc(
      db,
      `AyuntamientoJoquicingo2025-2027/gacetamunicipal/${period}`,
      "ignoraesto"
    );

    // Crea el documento con el ID "fecha"
    await setDoc(docRef, { fecha: new Date() });

    return {
      success: true,
      message: `Documento para el periodo ${period} creado exitosamente.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error al crear el documento: ${error.message}`,
    };
  }
};


export const addDocGacetaMunicipal = async(
  Periodo:string, 
  Documento: addingDocGacetaMunicipal
): Promise <{
  success: boolean;
  message: string;

}> => {
  try {
        if (!Periodo || !/^\d{4}$/.test(Periodo) || !Documento) {
      return {
        success: false,
        message:
          "Datos incorrectos",
       
      };
    }

const refGacetaMunicipalPeriodo = collection(db, `AyuntamientoJoquicingo2025-2027/gacetamunicipal/${Periodo }`)
const newDocGacetaMunicipal = doc(refGacetaMunicipalPeriodo)
const fileUrls = await uploadFiles( Periodo, Documento.Titulo, Documento.Documento)

 if (!fileUrls.File ) {
        return { success: false, message: "Error al subir archivos a Firebase Storage" };
      }


const documentoGacetaMunicipal = {
  Titulo: Documento.Titulo,
  Descripcion: Documento.Descripcion,
  Documento : fileUrls.File
}

await setDoc(newDocGacetaMunicipal, documentoGacetaMunicipal)

return { success: true, message: "Documento en gaceta municipal registrado exitosamente" };
  } catch (error:any) {
    return { success: false, message: "Error al registrar Documento en gaceta municipal" };
  }
}




const uploadFiles = async (Periodo: string, tituloDoc: string, File?: File|null) => {
    try {
      const folderPath = `joquicingo2025-2027/gacetasmunicipal/${Periodo}`;
      const fileUrls: { File?: string } = {};
  
  if(File){

      const docRef = ref(storage, `${folderPath}/${tituloDoc}.pdf`);
      await uploadBytes(docRef, File);
      fileUrls.File = await getDownloadURL(docRef);


  }
  

  
      return fileUrls;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };
  