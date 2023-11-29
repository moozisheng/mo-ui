import {defineConfig, presetAttributify, presetUno} from 'unocss';

export function createConfig({strict = true, dev = true} = {}) {
  return defineConfig({
    envMode: dev ? 'dev' : 'build', presets: [presetAttributify({strict}), presetUno()],
    shortcuts:{
      'c-success': '#2cb360',
      'selected-disabled': 'opacity-70'
    }
  });
}

export default createConfig();