const PokedexRow = ({id, name, types}) => {
    console.log(id)
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{types?.join(', ')}</td>
        </tr>
    )
}

export default PokedexRow