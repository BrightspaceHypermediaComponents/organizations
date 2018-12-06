const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<iron-iconset-svg name="d2l-organization-icons" size="18">
	<svg>
		<defs>
			<g id="quiz-submissions">
				<path id="Shape" class="cls-1" d="M15,0H3A3,3,0,0,0,0,3V15a3,3,0,0,0,3,3H15a3,3,0,0,0,3-3V3A3,3,0,0,0,15,0Zm1,15a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H15a1,1,0,0,1,1,1Z"></path>
				<circle id="Oval" class="cls-1" cx="9" cy="14" r="1"></circle>
				<path id="Shape-2" data-name="Shape" class="cls-1" d="M13,7a4,4,0,0,1-3,3.87V11a1,1,0,0,1-2,0V10A1,1,0,0,1,9,9,2,2,0,1,0,7,7,1,1,0,0,1,5,7a4,4,0,0,1,8,0Z"></path>
			</g>
		</defs>
	</svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
