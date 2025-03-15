import { useState, useRef } from 'react'
import styles from './HeaderLogo.module.css'

const HeaderLogo = () => {
    const defaultImg = "https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-notepad-icon-isolated-on-abstract-background-png-image_1746822.jpg"
    const [imgSrc, setImgSrc] = useState(defaultImg);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgSrc(imageUrl);
        }
    }

    const handleUrlChange = (event) => {
        setImgSrc(event.target.value);
    };

    return (
        <div className={styles.hl}>
            <div className={`${styles.img_con} ${styles.cell_align}`}>
                <img src={imgSrc} alt="Upload" className={styles.logo} onClick={() => fileInputRef.current.click()} />
                <input type="file" accept="image/*" ref={fileInputRef} style={{display:"none"}} onChange={handleFileChange} />
            </div>
            <div className={`${styles.text} ${styles.cell_align}`}>
                <h1 className={styles.name}>RinzList</h1>
            </div>
        </div>
    )
}

export default HeaderLogo