class ArskanLib {

    constructor() {
        this._this = this;
        this.apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlbGluZUBrcmFiYmkuZnIiLCJzaWxvIjoiNjIxNjVmOWFlZjAwZjAyZTEzYzc2ZDdjIiwiaWF0IjoxNjQ2OTA5MzExLCJpc3MiOiJodHRwczovL2FwaS5hcnNrYW4uY29tIn0.ENwjv5bwwtwxOWcGMxJ4CZ-GrhamEfDOMjPmm2Bpdac";
        this.profileToken = "5fd0a6c48568fc630e5be379"
    }

    /** buildHeaders
     * 
     * Construit l'en-tête nécessaire au bon fonctionnement de l'ensemble des fonctions de l'API
     * @returns Objet correspondant à l'en-tête
     */
    buildHeaders() {
        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.apiToken);

        return headers;
    }

    /** Documentation de l'API Arskan **/
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

    /** Get all objects on your Silo.

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
    getAllObjectsFromSilo() {
        // Construit l'en-tête
        var _headers = this.buildHeaders();

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
    getEmbedUrlOfObjectFromSilo(objectIDString) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.apiToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "profile": this.profileToken,
            "name": "lien"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objectIDString + "/embed", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    /** Get one object on your Silo

     * Syntaxe de l'URL : https://public-api.arskan.com/objects/:id
     * 
     * @param {*} objectIDString 
     * @returns 
     */
    getOneObjectFromSilo(objectIDString) {
        var _headers = this.buildHeaders();

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objectIDString, requestOptions)
            .then(response => response.text())
            .then(result => { console.log(result); return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });

    }

    /** Pointers functions */

    addPointerToObject(objectIDString, pointerDataJSON) {
        var _headers = this.buildHeaders();

        /*var raw = JSON.stringify(
        {
            "title": "Pointeur test",
            "description": "Un test de pointeur",
            "camera": {
                "position": [
                -4.077664170818505,
                -4.847131772241993,
                5.502754761565836],
                "target": [
                4.34378771530249,
                -5.631050889679713,
                2.456711622775799]
            },
            "position": {
                "x": 4.34378771530249,
                "y": -5.631050889679713,
                "z": 2.456711622775799
            }
        }
        );*/

        var raw = JSON.stringify(pointerDataJSON);

        var requestOptions = {
            method: 'POST',
            headers: _headers,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://public-api.arskan.com/objects/" + objectIDString + "/pointers", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    deletePointerFromObject(pointerIDString) {
        var _headers = this.buildHeaders();

        var requestOptions = {
            method: 'DELETE',
            headers: _headers,
            redirect: 'follow'
        };

        fetch("https://public-api.arskan.com/pointers/" + pointerIDString, requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    getAllPointersFromObject(objectIDString) {
        var _headers = this.buildHeaders();

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/objects/" + objectIDString + "/pointers", requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });


    }

    getOnePointerFromSilo(pointerIDString) {
        var _headers = this.buildHeaders();

        var requestOptions = {
            method: 'GET',
            headers: _headers,
            redirect: 'follow'
        };

        return fetch("https://public-api.arskan.com/pointers/" + pointerIDString, requestOptions)
            .then(response => response.text())
            .then(result => { return JSON.parse(result); })
            .catch(error => { return JSON.parse(error); });
    }

    updatePointerFromObject(pointerIDString, pointerDataJSON) {
        var _headers = this.buildHeaders();

        /*var raw = JSON.stringify({
        "title": "Pointeur test changed",
        "description": "Un test de pointeur",
        "camera": {
            "position": [
            -4.077664170818505,
            -4.847131772241993,
            5.502754761565836
            ],
            "target": [
            4.34378771530249,
            -5.631050889679713,
            2.456711622775799
            ]
        },
        "position": {
            "x": 4.34378771530249,
            "y": -5.631050889679713,
            "z": 2.456711622775799
        }
        });*/

        var raw = JSON.stringify(pointerDataJSON);

        var requestOptions = {
            method: 'PUT',
            headers: _headers,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://public-api.arskan.com/pointers/" + pointerIDString, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    /** Silos functions */
    getCurrentSilo() {
        var _headers = this.buildHeaders();

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

    /** Profiles functions */

    getProfilesViewer() {
        var _headers = this.buildHeaders();

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