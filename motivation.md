I would have liked a structure like

    <main id="scene">
        <div class="container" data-level=0>
            <div class="sheet">
                <span>F</span>
            </div>
        </div>
    </main>

But the perspective is set on #scene, so to pass the perspective to the non-direct children .sheet you need transform-style: preserve-3d. But this doesn't do what is wanted since the scene is transformed (scaled) too. Each time the scene is scaled down the perspective gets exaggerated.

Can't reproduce how it worked before. Use the above then. Set perspective for each container separately.