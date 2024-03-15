<?php

namespace App\Http\Resources;

class ActiveUserResource extends UserResource
{
    public function toArray($request)
    {
        return [
            'idPersonne' => $this->idPersonne,
            'client' => $this->personnePrenom . ' ' . $this->personneNom,
            'inscription' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'statut' => $this->isActive,
            'role' => $this->role,
        ];
    }
}
