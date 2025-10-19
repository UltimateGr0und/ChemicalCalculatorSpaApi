import type { ElementDto } from '../types/Element'
import type { ChemicalConnectionDto } from '../types/ChemicalConnection'

const baseUrl = "https://localhost:7211/api/";

export async function fetchElements() : Promise<ElementDto[]>{
    const res = await fetch(`${baseUrl}elements`);
    const data: ElementDto[] = await res.json();
    const elements: ElementDto[] = data.map((el: Omit<ElementDto, "isActive">) => ({
        ...el,
        isActive: false,
    }));
    return elements;
};

export async function fetchConnection(first: number, second: number) : Promise<ChemicalConnectionDto|string>{
    const url = `${baseUrl}connection/${first}/${second}`
    const res = await fetch(url);
    if (res.ok) {
        const data: ChemicalConnectionDto = await res.json();
        return data;
    } else {
        const error = "error: " + await res.text();
        return error;
    }

}