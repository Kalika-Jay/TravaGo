import React, {useEffect} from "react";
import '../styles/eee.css'


export default function Discovery(){
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.10.11/build/spline-viewer.js';
        document.body.appendChild(script);

        return () => {
            // Cleanup the script when component unmounts
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <spline-viewer className='bot' url="https://prod.spline.design/8IMHkUCnswY0NEhG/scene.splinecode"></spline-viewer>

        </>
    )
}