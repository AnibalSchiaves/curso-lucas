import styles from './Input.module.css';

export default function Input({label, id, type, register, registerOptions, errors}) {
    return <div className={styles.row}>
                <label className={styles.label}>{label}</label>
                <div className={styles.contentInput}>
                <input 
                    type={type} 
                    id={id} 
                    {...register(id, registerOptions)}>
                </input>
                {errors[id]?.type === 'required' && <p role="alert">{label} es requerido</p>}
                </div>
                
            </div>;
}