AFRAME.registerComponent('createmarker',{
 init: async function(){
  var mainScene = document.querySelector('#main-scene');
  var toys = await this.getAllToys();
  toys.map(toy =>{
    var marker = document.createElement('a-marker');
    marker.setAttribute('id',toy.id);
    marker.setAttribute('type','pattern');
    marker.setAttribute('url',toy.marker_pattern_url)
    marker.setAttribute('cursor',{
        rayOrigin : 'mouse'
    })

    marker.setAttribute('markerhandler',{})
    mainScene.appendChild(marker)

    var model = document.createElement('a-entity');
    model.setAttribute('id',`model-$(toy.id)`)
    model.setAttribute('position',toy.model_geometry.position);
    model.setAttribute('rotation',toy.model_geometry.rotation);
    model.setAttribute('scale',toy.model_geometry.scale)
    model.setAttribute('gltf-model',`url(${toy.model_url})`);
    model.setAttribute('gesture-handler',{})

    marker.appendChild(model)


    var infoPlane = document.createElement('a-entity');
    infoPlane.setAttribute('position',{x: 0,y: 0,z: 0.5});
    infoPlane.setAttribute('rotation',{x: -90,y: 0,z: 0})
    infoPlane.setAttribute('width',10);
    infoPlane.setAttribute('height',12);
    infoPlane.setAttribute('material',{
      color : 'yellow'
    })

    marker.appendChild(infoPlane);

  })
 },
 getAllToys: async function(){
    return await firebase
      .firestore()
      .collections('toys')
      .get()
      .then(snap =>{
        return snap.docs.map(doc => doc.data())
      });
 }
})