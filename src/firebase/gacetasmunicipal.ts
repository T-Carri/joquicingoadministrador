import {  doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Ajusta esta importación según tu estructura

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
