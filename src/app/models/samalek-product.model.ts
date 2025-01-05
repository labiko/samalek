import { SamalekCategory } from "./samalek-category.model";

export interface SamalekProduct {
    Id: number;
    Libelle: string;
    Description: string;
    Prix: number;
    Quantite: number;
    QuantiteProduit : string
    Image: string;
    EnRupture: boolean;
    category: string;
    EnPromo: boolean;
    PrixPromo?: number;
  }