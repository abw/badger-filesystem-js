import{_ as t,c as e,o as d,a2 as r}from"./chunks/framework.D9vdFLUf.js";const p=JSON.parse('{"title":"Reference","description":"","frontmatter":{},"headers":[],"relativePath":"reference.md","filePath":"reference.md","lastUpdated":null}'),o={name:"reference.md"},a=r('<h1 id="reference" tabindex="-1">Reference <a class="header-anchor" href="#reference" aria-label="Permalink to &quot;Reference&quot;">​</a></h1><h2 id="constructor-functions" tabindex="-1">Constructor Functions <a class="header-anchor" href="#constructor-functions" aria-label="Permalink to &quot;Constructor Functions&quot;">​</a></h2><p>Functions to create <a href="./directories.html"><code>Directory</code></a> and <a href="./files.html"><code>File</code></a> objects.</p><table><thead><tr><th>Function</th><th>Description</th></tr></thead><tbody><tr><td><a href="./directories.html#dir"><code>dir(path)</code></a></td><td>Create a directory object from a filesytem path</td></tr><tr><td><a href="./directories.html#bin"><code>bin()</code></a></td><td>Create a directory object for the parent of the executing script</td></tr><tr><td><a href="./directories.html#cwd"><code>cwd()</code></a></td><td>Create a directory object for the current working directory</td></tr><tr><td><a href="./files.html#file"><code>file(path)</code></a></td><td>Create a file object from a filesystem path</td></tr></tbody></table><h2 id="directory-methods" tabindex="-1">Directory Methods <a class="header-anchor" href="#directory-methods" aria-label="Permalink to &quot;Directory Methods&quot;">​</a></h2><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="./directory-methods.html#file"><code>file(name)</code></a></td><td>Return a file object for a file in the directory</td></tr><tr><td><a href="./directory-methods.html#dir"><code>dir(name)</code></a></td><td>Return a directory object for a sub-directory of the directory</td></tr><tr><td><a href="./directory-methods.html#parent"><code>parent()</code></a></td><td>Return a directory object for the parent directory</td></tr><tr><td><a href="./directory-methods.html#up"><code>up(n)</code></a></td><td>Return a directory object for a parent <code>n</code> levels up</td></tr><tr><td><a href="./directory-methods.html#path"><code>path()</code></a></td><td>Return the filesystem path for the directory</td></tr><tr><td><a href="./directory-methods.html#exists"><code>exists()</code></a></td><td>Determine if the directory exists</td></tr><tr><td><a href="./directory-methods.html#mustExist"><code>mustExist(options)</code></a></td><td>Assert that the directory exists and optionally create it</td></tr><tr><td><a href="./directory-methods.html#isEmpty"><code>isEmpty()</code></a></td><td>Determine if the directory is empty</td></tr><tr><td><a href="./directory-methods.html#notEmpty"><code>notEmpty()</code></a></td><td>Determine if the directory is not empty</td></tr><tr><td><a href="./directory-methods.html#mkdir"><code>mkdir(options)</code></a></td><td>Create the directory</td></tr><tr><td><a href="./directory-methods.html#create"><code>create()</code></a></td><td>Create the directory and any intermediate directories</td></tr><tr><td><a href="./directory-methods.html#rmdir"><code>rmdir(options)</code></a></td><td>Delete the directory</td></tr><tr><td><a href="./directory-methods.html#destroy"><code>destroy()</code></a></td><td>Delete the directory and anything it contains</td></tr><tr><td><a href="./directory-methods.html#empty"><code>empty(options)</code></a></td><td>Delete any files or sub-directories in the directory</td></tr><tr><td><a href="./directory-methods.html#read"><code>read()</code></a></td><td>Read the contents of the directory</td></tr><tr><td><a href="./directory-methods.html#entries"><code>entries()</code></a></td><td>Return file/directory objects for the contents of the directory</td></tr><tr><td><a href="./directory-methods.html#files"><code>files()</code></a></td><td>Return file objects for each file in the directory</td></tr><tr><td><a href="./directory-methods.html#directories"><code>directories()</code></a></td><td>Return directory objects for each sub-directory of the directory</td></tr></tbody></table><h2 id="file-methods" tabindex="-1">File Methods <a class="header-anchor" href="#file-methods" aria-label="Permalink to &quot;File Methods&quot;">​</a></h2><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="./file-methods.html#read"><code>read(options)</code></a></td><td>Read the contents of the file</td></tr><tr><td><a href="./file-methods.html#write"><code>write(data, options)</code></a></td><td>Write the data to the file</td></tr><tr><td><a href="./file-methods.html#delete"><code>delete(options)</code></a></td><td>Delete the file</td></tr><tr><td><a href="./file-methods.html#directory"><code>directory()</code></a></td><td>Return a directory object for the parent directory</td></tr><tr><td><a href="./file-methods.html#dir"><code>dir()</code></a></td><td>Alias for <code>directory()</code></td></tr><tr><td><a href="./file-methods.html#copyTo"><code>copyTo(destination, options)</code></a></td><td>Copy the file to a new location</td></tr><tr><td><a href="./file-methods.html#copyFrom"><code>copyFrom(source, options)</code></a></td><td>Copy the file from another location</td></tr><tr><td><a href="./file-methods.html#moveTo"><code>moveTo(destination, options)</code></a></td><td>Move the file to a new location</td></tr><tr><td><a href="./file-methods.html#moveFrom"><code>moveFrom(source, options)</code></a></td><td>Move the file from another location</td></tr></tbody></table><h2 id="path-methods" tabindex="-1">Path Methods <a class="header-anchor" href="#path-methods" aria-label="Permalink to &quot;Path Methods&quot;">​</a></h2><table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody><tr><td><a href="./path.html#path"><code>path(name)</code></a></td><td>Return the current path or a relative path</td></tr><tr><td><a href="./path.html#type"><code>type()</code></a></td><td>Return the type of object: <code>file</code> or <code>directory</code></td></tr><tr><td><a href="./path.html#parse"><code>parse()</code></a></td><td>Parse the path to extract filename, extension, etc.</td></tr><tr><td><a href="./path.html#unparse"><code>unparse()</code></a></td><td>Delete the cached parse data</td></tr><tr><td><a href="./path.html#dirname"><code>dirname()</code></a></td><td>Return the directory name</td></tr><tr><td><a href="./path.html#base"><code>base()</code></a></td><td>Return the complete file or directory name</td></tr><tr><td><a href="./path.html#name"><code>name()</code></a></td><td>Return the file or directory name without any extension</td></tr><tr><td><a href="./path.html#ext"><code>ext()</code></a></td><td>Return the file extension</td></tr><tr><td><a href="./path.html#relativePath"><code>relativePath(name)</code></a></td><td>Return a path relative to the current one</td></tr><tr><td><a href="./path.html#exists"><code>exists()</code></a></td><td>Determine if the file or directory exists</td></tr><tr><td><a href="./path.html#stat"><code>stat()</code></a></td><td>Fetch the <code>stat</code> data for the filesystem entry</td></tr><tr><td><a href="./path.html#unstat"><code>unstat()</code></a></td><td>Delete any cached <code>stat</code> data</td></tr><tr><td><a href="./path.html#isFile"><code>isFile()</code></a></td><td>Determine (from the filesystem) if this is a file</td></tr><tr><td><a href="./path.html#isDirectory"><code>isDirectory()</code></a></td><td>Determine (from the filesystem) if this is a directory</td></tr><tr><td><a href="./path.html#mode"><code>mode()</code></a></td><td>Return the file mode</td></tr><tr><td><a href="./path.html#size"><code>size()</code></a></td><td>Return the size in bytes</td></tr><tr><td><a href="./path.html#accessed"><code>accessed()</code></a></td><td>Return the last accessed time</td></tr><tr><td><a href="./path.html#modified"><code>modified()</code></a></td><td>Return the modified time</td></tr><tr><td><a href="./path.html#changed"><code>changed()</code></a></td><td>Return the changed time</td></tr><tr><td><a href="./path.html#created"><code>created()</code></a></td><td>Return the created time</td></tr></tbody></table>',10),h=[a];function c(i,s,n,l,m,f){return d(),e("div",null,h)}const u=t(o,[["render",c]]);export{p as __pageData,u as default};
