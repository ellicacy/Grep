<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EvenementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'evenementNom'=>$this->evenementNom,
            'evenementDescription'=>$this->evenementDescription,
            'evenementDate'=>$this->evenementDate,
            'evenementRue'=>$this->evenementRue,
            'evenementCP'=>$this->evenementCP,
            'evenementVille'=>$this->evenementVille,
            'evenementNbrPersonne'=>$this->evenementNbrPersonne,
            'evenementHeureDebut'=>$this->evenementHeureDebut,
            'evenementHeureFin'=>$this->evenementHeureFin,
            'evenementStatus'=>$this->evenementStatus,
            'paiementNo'=>$this->paiementNo,
            'paiementMontant'=>$this->paiementMontant,
            'paiementType'=>$this->paiementType,
            // POUR AFFICHER LES PRESTATION QUAND ON CREER UNE RESOURCE
            'prestations'=>$this->prestations,
            // FAIT LA MEME CHOSE MAIS N'AFFICHE PAS LA TABLE PIVOT
            // 'prestations'=>PrestationNewResource::collection($this->prestations),
            'paiementStatus'=>$this->paiementStatus,
            'created_at'=>$this->created_at->format('Y-m-d H:i:s'),
            'updated_at'=>$this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
