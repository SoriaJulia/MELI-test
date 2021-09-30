export default function ItemsList(props){
    const {items} = props;

    return (
        items.map(item => {
            return (
                <div key={item.id}>
                    {item.title}
                </div>
            )
        })
    )
}
