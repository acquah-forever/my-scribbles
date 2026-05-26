const [link, setLink] = useState(false)

function handleClick(index){
    const openLink = if(index === 0 ? null : index)
    setLink(openLink)
}

<button onClick={() => handleClick(job.id)}>

</button>

{link === job.id && }