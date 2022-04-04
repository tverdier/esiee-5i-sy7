class ArskanLibrary {

    constructor() {
        this._this = this;
        this.m_apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlbGluZUBrcmFiYmkuZnIiLCJzaWxvIjoiNjIxNjVmOWFlZjAwZjAyZTEzYzc2ZDdjIiwiaWF0IjoxNjQ2OTA5MzExLCJpc3MiOiJodHRwczovL2FwaS5hcnNrYW4uY29tIn0.ENwjv5bwwtwxOWcGMxJ4CZ-GrhamEfDOMjPmm2Bpdac";
        this.m_profileToken = "5fd0a6c48568fc630e5be379"
    }

    /*********************************************************************************************/
    /** Documentation de l'API Arskan
     *  -----------------------------
     *  https://public-api.arskan.com/apidoc 
     */
    /*********************************************************************************************/

    /** Objects functions
     *  -----------------
     *   Add an object to your silo.
     *   Delete a embed link.
     *   Delete an object.
     *   Get all objects on your Silo.
     *   Get embed url for an object of your Silo.
     *   Get one object on your Silo.
     *   Update an object on your Silo.
     */
    /*********************************************************************************************/

    /** Get all objects on your Silo.

     * https://public-api.arskan.com/objects
    
     * Header
     * Champ 	        Type 	        Description
     * Authorization 	String 	        Bear access token.
     * 
     * @returns Tableau de tous les objets des correspondant à l'ensemble des objets du Silo
     * Attributs de l'objet renvoyé :
     *   Champ 	        Type 	    Description
     *   name 	        String      Object name.
     *   silo_id 	    String 	    Related silo id.
     *   description 	String 	    Description.
     *   picture 	    String 	    Url picture.
     *   shared 	    Object 	
     *   enabled 	    String 	    Status of shared object.
     *   url 	        String 	    Id for share object.
     */
    getAllObjectsFromSilo() {
        // Construit l'en-tête
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        // Déclare les options de la requête
        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        // Récupère l'ensemble des objets du Silo et les renvoie sous forme d'objet 
        return fetch("https://public-api.arskan.com/objects/", requestOptions)
            .then(response => response.text())
            .then(result => { console.log(result); return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    /** Get embed url for an object of your Silo.

     * https://public-api.arskan.com/objects
    
     * Header
     * Champ 	        Type 	        Description
     * Authorization 	String 	        Bear access token.
     * 
     * @returns Tableau de tous les Objets des correspondant à l'ensemble des objets du Silo
     * Attributs de l'objet renvoyé :
     *   Champ 	        Type 	    Description
     *   name 	        String      Object name.
     *   silo_id 	    String 	    Related silo id.
     *   description 	String 	    Description.
     *   picture 	    String 	    Url picture.
     *   shared 	    Object 	
     *   enabled 	    String 	    Status of shared object.
     *   url 	        String 	    Id for share object.
     */
    getEmbedUrlOfObjectFromSilo(objID) {
        var _headers = new Headers();
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var _body = JSON.stringify({
            "profile": this.m_profileToken,
            "name": "lien"
        });

        var requestOptions = {
            method: 'POST',
            headers: _headers,
            body: _body,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objID + "/embed", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    /** Get one object on your Silo

     * Syntaxe de l'URL : https://public-api.arskan.com/objects/:id
     * 
     * @param {string} objID 
     * @returns 
     */
    getOneObjectFromSilo(objID) {
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objID, requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });

    }

    /*********************************************************************************************/
    /** Pointers functions
     *  ------------------
     * Add an pointer to your object.
     * Delete an pointer on your object.
     * Get all pointers from object.
     * Get one pointer on your Silo.
     * Update an pointer on your object.
     */
    /*********************************************************************************************/

    /**
     * 
     * @param {string} objID 
     * @param {JSON} ptrData 
     * @returns 
     */
    addPointerToObject(objID, ptrData) {
        var _headers = new Headers();
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this._this.m_apiToken);

        console.log("addPointerToObject", ptrData);
        var _body = JSON.stringify(ptrData);

        var requestOptions = {
            method: 'POST',
            headers: _headers,
            body: _body,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objID + "/pointers", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    /**
     * 
     * @param {string} ptrID 
     * @returns 
     */
    deletePointerFromObject(ptrID) {
        var _headers = new Headers();
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var requestOptions = {
            method: 'DELETE',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/pointers/" + ptrID, requestOptions)
            .then(response => response.text())
            .then(result => { return result; })
            .catch(error => { return JSON.parse(error); });
    }

    /**
     * 
     * @param {string} objID 
     * @returns 
     */
    getAllPointersFromObject(objID) {
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);
        _headers.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objID + "/pointers", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });

    }

    /**
     * 
     * @param {*} ptrID 
     * @returns 
     */
    getOnePointerFromSilo(ptrID) {
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/pointers/" + ptrID, requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    /**
     * 
     * @param {str} ptrID 
     * @param {JSON} ptrData 
     * @returns 
     */
    updatePointerFromObject(ptrID, ptrData) {
        var _headers = new Headers();
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var _body = JSON.stringify(ptrData);

        var requestOptions = {
            method: 'PUT',
            headers: _headers,
            body: _body,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/pointers/" + ptrID, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    /** Silos functions
     *  ------------------
     * Get your current Silo (associated with the token).
     * Update the current Silo (associated with the token) - TODO
     */
    getCurrentSilo() {
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/silos/current", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });

    }

    /** Profiles function
     *  -----------------
     * Get profiles viewer
     */

    /**
     * getProfilesViewer
     * @returns 
     */
    getProfilesViewer() {
        var _headers = new Headers();
        _headers.append("Accept", "application/json");
        _headers.append("Content-Type", "application/json");
        _headers.append("Authorization", "Bearer " + this.m_apiToken);

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/profiles")
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });

    }

}