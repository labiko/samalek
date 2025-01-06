import { SamalekProduct } from "./samalek-product.model";
import { SamalekClient } from "./SamalekClient";

export interface managecommandes {
    samalekproduit: SamalekProduct[]
    marcheId: any
    marcheLibelle: string
    totalCommande: any
    modePaiement: string
    client : SamalekClient
}