/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "./shared-components/**/*.{js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
  			serif: ['Newsreader', 'Georgia', 'serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// Escalas remapeadas para a paleta TOCA v1.0 (tokens centralizados).
  			// Neutros frios (gray/slate/zinc/neutral/stone) -> neutros quentes; roxo/rosa/azul -> família Laranja/Terracota.
  			// '-500' da família de marca é um tom AA-seguro (4,5:1 com texto branco); o Laranja exato é toca-laranja.
  			toca: {
  				obsidiana: '#1A1714', laranja: '#E8571A', terracota: '#C1440E', oliva: '#6B7C3A',
  				areia: '#F2DEC4', suave: '#FAF6EE', media: '#F5EFE5', ink: '#2A2520'
  			},
  			gray: {
  				'50': '#FAF6EE',
  				'100': '#F5EFE5',
  				'200': '#E9DFCF',
  				'300': '#D8CAB4',
  				'400': '#A89A89',
  				'500': '#7A6D60',
  				'600': '#5E5247',
  				'700': '#463D35',
  				'800': '#2A2520',
  				'900': '#1A1714',
  				'950': '#110F0D'
  			},
  			slate: {
  				'50': '#FAF6EE',
  				'100': '#F5EFE5',
  				'200': '#E9DFCF',
  				'300': '#D8CAB4',
  				'400': '#A89A89',
  				'500': '#7A6D60',
  				'600': '#5E5247',
  				'700': '#463D35',
  				'800': '#2A2520',
  				'900': '#1A1714',
  				'950': '#110F0D'
  			},
  			zinc: {
  				'50': '#FAF6EE',
  				'100': '#F5EFE5',
  				'200': '#E9DFCF',
  				'300': '#D8CAB4',
  				'400': '#A89A89',
  				'500': '#7A6D60',
  				'600': '#5E5247',
  				'700': '#463D35',
  				'800': '#2A2520',
  				'900': '#1A1714',
  				'950': '#110F0D'
  			},
  			neutral: {
  				'50': '#FAF6EE',
  				'100': '#F5EFE5',
  				'200': '#E9DFCF',
  				'300': '#D8CAB4',
  				'400': '#A89A89',
  				'500': '#7A6D60',
  				'600': '#5E5247',
  				'700': '#463D35',
  				'800': '#2A2520',
  				'900': '#1A1714',
  				'950': '#110F0D'
  			},
  			stone: {
  				'50': '#FAF6EE',
  				'100': '#F5EFE5',
  				'200': '#E9DFCF',
  				'300': '#D8CAB4',
  				'400': '#A89A89',
  				'500': '#7A6D60',
  				'600': '#5E5247',
  				'700': '#463D35',
  				'800': '#2A2520',
  				'900': '#1A1714',
  				'950': '#110F0D'
  			},
  			purple: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			violet: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			fuchsia: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			pink: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			indigo: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			blue: {
  				'50': '#FDF1EA',
  				'100': '#FBE0D2',
  				'200': '#F6C1A5',
  				'300': '#F09A6E',
  				'400': '#EC7A43',
  				'500': '#CF4A12',
  				'600': '#C1440E',
  				'700': '#9A360B',
  				'800': '#7A2B0A',
  				'900': '#5C2108',
  				'950': '#3A1505'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}