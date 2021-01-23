import { DenonConfig } from 'https://deno.land/x/denon@2.4.6/mod.ts';
const config: DenonConfig = {
scripts: {
 start: {
cmd: 'deno run main.ts',
 desc: 'run my main.ts file',
},
},
 'allow': [
 'run',
 'read',
 'write',
 'net',
'plugin'
]
};
export default config;