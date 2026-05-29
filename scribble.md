const filteredJobs = useMemo(() => {
    if(!jobs) return []
    
    let results = results

    if(query.trim()) !== ""{
        results = results.filter((item) => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
        )

        const normalize = (s,"") => toString().replace(/-/g , "").toLowerCase()

        if(natureOfName){
            const newFormat = normalize(natureOfName)
            const results = results.filter((item) => normalize(item.modeOfName).includes(newFormat))
        }

        if(modeOfTravel){
            const newFormat2 = normalize(modeOfTravel)
            const results = results.filter((item) => {
                const newParameters = (item.transportationType || modeOfTransportation || transportation || "").toString()
                normalize(newParameters).includes(newFormat2))
            })
        }

        return results || []
    },[query,natuerOfName, modeOfTravel, results]
})