<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'idPersonne' => $this->idPersonne,
            'personneLogin' => $this->personneLogin,
            'personneNom' => $this->personneNom,
            'personnePrenom' => $this->personnePrenom,
            'personneDateNaissance' => $this->personneDateNaissance,
            'clientRue' => $this->clientRue,
            'clientCodePostal' => $this->clientCodePostal,
            'clientVille' => $this->clientVille,
            'prestaireType' => $this->prestaireType,
            'prestataireDescription' => $this->prestataireDescription,
            'prestatairePhotos' => $this->prestatairePhotos,
            'prestataireEntrepriseNom' => $this->prestataireEntrepriseNom,
            'prestataireEntrepriseRue' => $this->prestataireEntrepriseRue,
            'prestataireEntrepriseCP' => $this->prestataireEntrepriseCP,
            'prestataireEntrepriseVille' => $this->prestataireEntrepriseVille,
            'prestataireNoTVA' => $this->prestataireNoTVA,
            'prestataireBanque' => $this->prestataireBanque,
            'prestataireBanqueRue' => $this->prestataireBanqueRue,
            'prestataireBanqueCP' => $this->prestataireBanqueCP,
            'prestataireBanqueVille' => $this->prestataireBanqueVille,
            'prestataireSWIFT' => $this->prestataireSWIFT,
            'prestataireIBAN' => $this->prestataireIBAN,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
            'role' => $this->role,
        ];
    }
}
