
var validSiteIds = [1, 7, 9, 15, 16];
var nodeId;


function MlpProductCOCO(p,n) {
    this.productId = p;
    this.nodeId = n;
}

function fetchMiniMlpCOCO(p,n) {
    var search = location.search;
    var re = /noAjax/;
    if (!re.test(search)) {
        var product = new MlpProductCOCO(p,n);
        product.loadMlpDataCOCO();
    }
}

MlpProductCOCO.prototype.loadMlpDataCOCO = function() {
    var siteId = getSiteIdFromOid();
    var url = "http://" + correctHostForSite(siteId) + "/4592-" + this.nodeId + tokenizeSiteId(siteId) + this.productId + ".html";
    var productId = this.productId;
    var noPricingData = "<div class=\"myp_clock\"><div align=\"center\">" +
                        "<p style=\"float:none;\">Unable to retrieve pricing data<p>" +
                        "</div></div><br clear=\"all\" /></div></div><div class=\"hrw hrprices\"><hr /></div>";
    var mlpReq;
    if (window.XMLHttpRequest) {
        mlpReq = new XMLHttpRequest();
        mlpReq.onreadystatechange = function() {
            if (mlpReq.readyState == 4) {
                if (mlpReq.status == 200) {
                    var re = /Page Not Found/;
                    if (!re.test(mlpReq.responseText)) {
                        document.getElementById(productId + "_mlp").innerHTML = mlpReq.responseText;
                    } else {
                        document.getElementById(productId + "_mlp").innerHTML = noPricingData;
                    }
                }
            }
        };
        mlpReq.open("GET", url, true);
        mlpReq.send(null);
    } else if (window.ActiveXObject) {
        mlpReq = new ActiveXObject("Microsoft.XMLHTTP");
        if (mlpReq) {
            mlpReq.onreadystatechange = function() {
                if (mlpReq.readyState == 4) {
                    if (mlpReq.status == 200) {
                        var re = /Page Not Found/;
                        if (!re.test(mlpReq.responseText)) {
                            document.getElementById(productId + "_mlp").innerHTML = mlpReq.responseText;
                        } else {
                            document.getElementById(productId + "_mlp").innerHTML = noPricingData;
                        }
                    }
                }
            };
            mlpReq.open("GET", url, true);
            mlpReq.send();
        }
    }
}


function correctHostForSite(siteId) {
    var host = location.host;
    if (siteId == 1) {
        var re1 = /^reviews/;
        var re2 = /^shopper/;
        if (re1.test(host)) {
            host = host.replace(re1, 'www');
        } else if (re2.test(host)) {
            host = host.replace(re2, 'www');
        }
    } else if (siteId == 7) {
        var re1 = /^www/;
        var re2 = /^shopper/;
        if (re1.test(host)) {
            host = host.replace(re1, 'reviews');
        } else if (re2.test(host)) {
            host = host.replace(re2, 'reviews');
        }
    } else if (siteId == 9) {
        var re1 = /^www/;
        var re2 = /^reviews/;
        if (re1.test(host)) {
            host = host.replace(re1, 'shopper');
        } else if (re2.test(host)) {
            host = host.replace(re2, 'shopper');
        }
    }
    return host;
}

function getSiteIdFromOid() {
    // Gonna parse the siteId out of the oid safely.  First grab the path.
    var path = location.pathname;
    // Find the last occurrence of the underscore, so we know we are right before the siteId
    var underScoreIndex = path.lastIndexOf("_");
    // Get the chunk that starts with that underscore
    var pathChunk = path.substring(underScoreIndex, path.length);
    // Now find the index of the first dash after that underscore
    var dashIndex = pathChunk.indexOf("-");
    // Now using both indices, grab just the siteId out of the path
    var siteId = parseInt(pathChunk.substring(1, dashIndex));
    // Check to see if this is a number, if not, then return invalid
    if (siteId == "NaN") {
        // If we didn't a valid siteId, hopefully we can get by without it.  Return invalid.
        return "invalid";
    } else {
        // Ok, we got a number, so see if it is in our list of valid siteIds
        for (var i = 0; i < validSiteIds.length; i++) {
            if (siteId == validSiteIds[i]) {
                // This is a valid siteId, so return it
                return siteId;
            }
        }
        // If we get here, then we didn't find a valid siteId, return invalid
        return "invalid";
    }


}

function tokenizeSiteId(siteId) {
    if (siteId != "invalid") {
        siteId = "_" + siteId + "-";
    } else {
        siteId = "-";
    }
    return siteId;
}

