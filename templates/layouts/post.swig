{% extends 'master.swig' %}

{% block 'open-graph' %}
<meta property="og:title" content="{{ title }}">
<meta property="og:type" content="article">
<meta property="og:url" content="http://www.andrewduthie.com/post/{{ @name }}/">
<meta property="article:published_time" content="{{ date.toISOString() }}">
<meta property="article:author" content="http://www.andrewduthie.com/">
{% endblock %}

{% block 'title' %}{{ title }}{% endblock %}

{% block 'header' %}
    <div class="post-header clearfix">
        <div class="return-home">
            <a href="/"><i class="headshot-mini"></i> Home</a>
        </div>
        {% include 'templates/_partials/me-links.html' %}
    </div>
{% endblock %}

{% block 'description' %}{{ description }}{% endblock %}

{% block 'main' : %}
    {% include 'templates/_partials/post.html' with post %}
    <a name="disqus_thread"></a>
    <div id="disqus_thread"></div>
    <script type="text/javascript">
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'andrewduthie'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
{% endblock %}
