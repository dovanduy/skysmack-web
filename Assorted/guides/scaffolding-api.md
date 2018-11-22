# Scaffolding and updating the Skysmack API

1. [Install Java](https://java.com/en/download/).

2. Get the newest version of Swagger Codegen ([Currently 2.3.1](https://mvnrepository.com/artifact/io.swagger/swagger-codegen-cli/2.3.1)).

3. Run the following command in the commandline from the same place as the Swagger Codegen file.
***NOTE***
You might need to replace http://localhost:2000/swagger.json  with http://client1.skysmack-io.test:2000/swagger.json or something similar.

***REMEMBER TO BUILD THE SKYSMACK BACKEND PROJECT FIRST TO GET THE NEWEST CHANGES!!!***

`java -Dmodels -DsupportingFiles -jar swagger-codegen-cli-2.3.1.jar generate -i  http://localhost:2000/swagger.json -l typescript-angular`

or alternative

`java -Dmodels -DsupportingFiles -jar swagger-codegen-cli-2.3.1.jar generate -i  http://client1.skysmack-io.test:2000/swagger.json -l typescript-angular`

***REMEMBER TO BUILD THE SKYSMACK BACKEND PROJECT FIRST TO GET THE NEWEST CHANGES!!!***

4. Move the generated files to: "Skysmack.Portal.Anuglar\src\skysmack-api". Delete the current contents first.

5. Everything should now work.

