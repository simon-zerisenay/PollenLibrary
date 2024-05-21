

const addNewPollen = async() => {
    const {common_name,
         arabic_name, 
         botabical_name,
         synonyms,
         family,
          kind,
          Emirate,
          catagories,
          habitats,
          types,
          references,
          area_of_collection,   
          image
        } = req.body;

        try{

            const pollen_result = await db.query(
                "INSERT INTO tbl_pollen (common_name, arabic_name, botabical_name, synonyms, family, kind, Emirate, catagories, habitats, types, references, area_of_collection) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [common_name, arabic_name, botabical_name, synonyms, family, kind, Emirate, catagories, habitats, types, references, area_of_collection,image]
            )
            if 

        }catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error registering user' });
            
        }
}
