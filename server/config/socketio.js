/**
 * Socket.io configuration
 */
'use strict';

// import config from './environment';

// When the user disconnects.. perform this
function onDisconnect( /*socket*/ ) {}

// When the user connects.. perform this
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', data => {
        socket.log(JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    require('../api/Etablissement_Module/annee_academique/annee_academique.socket').register(socket);
    require('../api/Etablissement_Module/suivi_cours_classe/suivi_cours_classe.socket').register(socket);
    require('../api/Etablissement_Module/detail_user/detail_user.socket').register(socket);
    require('../api/Etablissement_Module/detail_annonce/detail_annonce.socket').register(socket);
    require('../api/Etablissement_Module/annonce/annonce.socket').register(socket);
    require('../api/Etablissement_Module/classe/classe.socket').register(socket);
    require('../api/Etablissement_Module/etablissement/etablissement.socket').register(socket);
    require('../api/Etablissement_Module/niveau/niveau.socket').register(socket);
    require('../api/thing/thing.socket').register(socket);
}

export default function(socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));

    socketio.on('connection', function(socket) {
        socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

        socket.connectedAt = new Date();

        socket.log = function(...data) {
            console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
        };

        // Call onDisconnect.
        socket.on('disconnect', () => {
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });

        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');
    });
}