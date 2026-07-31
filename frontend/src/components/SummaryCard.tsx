type Props = {
    title: string,
    amount: number
}

function SummaryCard( {title, amount}: Props){
    return (
        <div>
            <h3>{title}</h3>
            <h2>{amount}</h2>
        </div>
    )
}

export default SummaryCard;