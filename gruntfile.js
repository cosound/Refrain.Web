module.exports = function (grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		copy: {
			CopyToDestination: {
				cwd: "src/app/Refrain.Web",
				src: ["**/*", "!*csproj*", "!web.Debug.config", "!web.Release.config", "!App/*", "!App", "!TypescriptDefinitions/*", "!TypescriptDefinitions", "!obj/*", "!obj", "!bin/*", "!bin"],
				expand: true
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("CopyToDestination", "Copy files to destination", function(destination)
	{
		if (arguments.length == 0) throw new Error("Destination missing");

		grunt.config.set("copy.CopyToDestination.dest", destination);
		grunt.task.run("copy:CopyToDestination");
	});
	
	grunt.registerTask("default", function(destination)
	{
		if (arguments.length == 0) destination = "dist";

		grunt.task.run("CopyToDestination:" + destination);
	});
};