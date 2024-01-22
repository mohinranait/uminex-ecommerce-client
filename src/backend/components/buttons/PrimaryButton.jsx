const PrimaryButton = ({text,type, bg='#fff', color='#222', another}) => {
    return (
        <button type={type} className={`px-3 py-2 inline-block rounded ${bg} ${color} ${another}`}>
            {text}
        </button>
    );
};

export default PrimaryButton;