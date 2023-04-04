export default function Input({label, id, type, register, registerOptions, errors}) {
    return <div className="row">
                <label>{label}</label>
                <div className="content-input">
                <input 
                    type={type} 
                    id={id} 
                    {...register(id, registerOptions)}>
                </input>
                </div>
                {errors[id]?.type === 'required' && <p role="alert">{label} es requerido</p>}
            </div>;
}