import { useEffect, useRef, useState } from 'react';
import { Application, Assets, Sprite, Container } from 'pixi.js';
type Layer={id:string;name:string;url:string;x:number;y:number;rotation:number;scale:number;pivotX:number;pivotY:number;visible:boolean};
type Project={version:1;name:string;layers:Layer[]};
const initial:Project={version:1,name:'Nouveau personnage',layers:[]};
export default function App(){
 const [project,setProject]=useState<Project>(initial);
 const [selected,setSelected]=useState<string|null>(null);
 const [error,setError]=useState('');
 const host=useRef<HTMLDivElement>(null);
 const app=useRef<Application|null>(null);
 const pixiRoot=useRef<Container|null>(null);
 const state=useRef(project);state.current=project;
 const patch=(id:string,data:Partial<Layer>)=>setProject(p=>({...p,layers:p.layers.map(l=>l.id===id?{...l,...data}:l)}));
 const selectedLayer=project.layers.find(l=>l.id===selected);
 useEffect(()=>{
  let cancelled=false,ready=false;
  const instance=new Application();
  async function init(){
   await instance.init({background:'#0B1821',resizeTo:host.current!,antialias:true});
   if(cancelled){instance.destroy(true);return;}
   ready=true;app.current=instance;host.current!.appendChild(instance.canvas);
   const root=new Container();pixiRoot.current=root;instance.stage.addChild(root);
  }
  void init();
  return ()=>{cancelled=true;if(ready){instance.destroy(true,{children:true});app.current=null;pixiRoot.current=null;}};
 },[]);
 useEffect(()=>{
  let cancelled=false;
  const instance=app.current,root=pixiRoot.current;
  if(!instance||!root)return;
  root.removeChildren().forEach(c=>c.destroy());
  async function rebuild(){
   for(const l of project.layers){
    const texture=await Assets.load(l.url);
    if(cancelled)return;
    const sprite=new Sprite(texture);sprite.label=l.id;
    sprite.anchor.set(l.pivotX,l.pivotY);
    sprite.position.set(instance!.screen.width/2+l.x,instance!.screen.height/2+l.y);
    sprite.scale.set(l.scale);sprite.rotation=l.rotation*Math.PI/180;sprite.visible=l.visible;
    sprite.eventMode='static';sprite.cursor='move';
    sprite.on('pointerdown',e=>{
      e.stopPropagation();setSelected(l.id);
      const start={x:e.global.x,y:e.global.y};
      const current=state.current.layers.find(item=>item.id===l.id);
      if(!current)return;
      const base={x:current.x,y:current.y};
      const move=(ev:PointerEvent)=>{
       const r=instance!.canvas.getBoundingClientRect();
       const x=(ev.clientX-r.left)*instance!.screen.width/r.width;
       const y=(ev.clientY-r.top)*instance!.screen.height/r.height;
       const nx=base.x+x-start.x,ny=base.y+y-start.y;
       sprite.position.set(instance!.screen.width/2+nx,instance!.screen.height/2+ny);
       patch(l.id,{x:nx,y:ny});
      };
      const stop=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',stop);};
      window.addEventListener('pointermove',move);
      window.addEventListener('pointerup',stop,{once:true});
    });
    root!.addChild(sprite);
   }
  }
  void rebuild();return()=>{cancelled=true};
 },[project.layers.map(l=>l.id+':'+l.url).join('|')]);
 useEffect(()=>{
  const root=pixiRoot.current,instance=app.current;if(!root||!instance)return;
  for(const l of project.layers){
   const sprite=root.children.find(c=>c.label===l.id) as Sprite|undefined;if(!sprite)continue;
   sprite.anchor.set(l.pivotX,l.pivotY);sprite.position.set(instance.screen.width/2+l.x,instance.screen.height/2+l.y);
   sprite.rotation=l.rotation*Math.PI/180;sprite.scale.set(l.scale);sprite.visible=l.visible;sprite.alpha=l.id===selected?1:0.95;
   root.setChildIndex(sprite,project.layers.indexOf(l));
  }
 },[project,selected]);
 async function importImages(files:FileList|null){
  if(!files)return;
  for(const file of Array.from(files)){
   if(file.type!=='image/png'){setError('Formats acceptés : PNG');continue;}
   const url=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result as string);reader.onerror=reject;reader.readAsDataURL(file);});
   const id=crypto.randomUUID();setProject(p=>({...p,layers:[...p.layers,{id,name:file.name,url,x:0,y:0,rotation:0,scale:1,pivotX:.5,pivotY:.5,visible:true}]}));setSelected(id);
  }
 }
 function save(){const blob=new Blob([JSON.stringify(project)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='rig2d-project.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function load(file?:File){if(!file)return;try{const p=JSON.parse(await file.text()) as Project;if(p.version!==1||!Array.isArray(p.layers))throw Error('Format inconnu');setProject(p);setSelected(null);setError('');}catch{setError('Fichier projet invalide');}}
 function shift(id:string,d:number){setProject(p=>{const layers=[...p.layers],i=layers.findIndex(l=>l.id===id),j=i+d;if(j<0||j>=layers.length)return p;[layers[i],layers[j]]=[layers[j],layers[i]];return {...p,layers};});}
 return <div className="app">
 <header><div className="brand"><img src="/assets/branding/Logo%20RIG2DKARTA%20d%E2%80%99animation%202D.png" alt="RIG2DKARTA" /><span className="brand-subtitle">2D RIGGING STUDIO</span></div><input aria-label="Nom du projet" value={project.name} onChange={e=>setProject(p=>({...p,name:e.target.value}))}/>
 <label className="btn">Importer PNG<input type="file" multiple accept="image/png" hidden onChange={e=>{void importImages(e.target.files);e.target.value='';}}/></label>
 <label className="btn">Ouvrir projet<input type="file" accept=".json" hidden onChange={e=>{void load(e.target.files?.[0]);e.target.value='';}}/></label>
 <button onClick={save}>Enregistrer</button></header>
 <div className="workspace"><aside><h3>CALQUES</h3>{[...project.layers].reverse().map(l=><div key={l.id} className={'layer '+(selected===l.id?'active':'')}><button onClick={()=>patch(l.id,{visible:!l.visible})}>{l.visible?'◉':'○'}</button><span onClick={()=>setSelected(l.id)}>{l.name}</span><button onClick={()=>shift(l.id,1)}>↑</button><button onClick={()=>shift(l.id,-1)}>↓</button></div>)}{project.layers.length===0&&<p>Importe des PNG pour commencer.</p>}</aside>
 <main><div className="bar"><span className="live-dot" /> ESPACE DE TRAVAIL <span className="bar-meta">CANVAS · 2D</span></div><div className="stage" ref={host}></div><div className="status">{error||'Clique sur un élément pour le sélectionner et le déplacer.'}</div></main>
 <aside><h3>PROPRIÉTÉS</h3>{selectedLayer?<>
 <label>Nom<input value={selectedLayer.name} onChange={e=>patch(selectedLayer.id,{name:e.target.value})}/></label>
 {(['x','y','rotation','scale','pivotX','pivotY'] as const).map(key=><label key={key}>{key}<input type="number" step={key==='scale'||key.startsWith('pivot')?0.05:1} value={selectedLayer[key]} onChange={e=>patch(selectedLayer.id,{[key]:Number(e.target.value)})}/></label>)}
 <button onClick={()=>{setProject(p=>({...p,layers:p.layers.filter(l=>l.id!==selected)}));setSelected(null);}}>Supprimer</button>
 </>:<p>Sélectionne un calque.</p>}</aside></div>
 <footer><div className="timeline-heading"><span className="live-dot" /> TIMELINE <span className="timeline-note">À venir dans la prochaine phase</span></div><div className="timeline-track"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></footer></div>;
}
