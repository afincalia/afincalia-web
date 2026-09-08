import Head from 'next/head';
import { useState } from 'react';
export async function getServerSideProps() { return process.env.VERCEL_ENV === 'production' ? {notFound:true} : {props:{}}; }
export default function QA() {
 const [width,setWidth]=useState('390'),[path,setPath]=useState('/demo');
 return <><Head><title>QA de vista adaptable</title><meta name="robots" content="noindex,nofollow"/></Head><div style={{padding:16}}><label>Ancho del viewport<select value={width} onChange={e=>setWidth(e.target.value)}>{['320','390','768','1024','1440'].map(x=><option key={x}>{x}</option>)}</select></label><label>Página<select value={path} onChange={e=>setPath(e.target.value)}>{['/demo','/','/contacto','/precios','/piloto','/politica-privacidad'].map(x=><option key={x}>{x}</option>)}</select></label><p>Vista de QA. No disponible en producción.</p><iframe title="Página en viewport de prueba" src={path} style={{width:Number(width),height:844,border:'1px solid #aaa',display:'block'}}/></div></>;
}
